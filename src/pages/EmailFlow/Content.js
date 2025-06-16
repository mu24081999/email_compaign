import { useState, useCallback, useEffect } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
} from "reactflow";
import AutomationNode from "./components/AutomationNode";
import "reactflow/dist/style.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addEmailFLowApi,
  getUserEmailFlows,
} from "../../redux/services/emailFlow";

const nodeTypes = {
  automationNode: AutomationNode,
};

const initialNodes = [
  {
    id: "1",
    type: "automationNode",
    position: { x: 400, y: 50 },
    data: {
      label: "Start",
      type: "start",
      onAdd: null,
      onDelete: null,
    },
  },
];

function Content() {
  const dispatch = useDispatch();
  const { token, user_id } = useSelector((state) => state.auth);
  const { emailFlows } = useSelector((state) => state.emailFlow);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) => addEdge({ ...params, type: "smoothstep" }, eds)),
    [setEdges]
  );

  const handleAddNode = useCallback(
    (type = "email", parentNode = nodes[0]) => {
      const newNodeId = `node_${nodes.length + 1}`;
      const parentPosition = parentNode.position;

      let defaultData = { type, label: "" };

      if (type === "email") {
        defaultData = {
          ...defaultData,
          label: "Send Email",
          subject: "",
          body: "",
        };
      } else if (type === "delay") {
        defaultData = {
          ...defaultData,
          label: "Delay",
          seconds: 3600,
        };
      } else if (type === "condition") {
        defaultData = {
          ...defaultData,
          label: "Condition",
          condition: "",
        };
      }

      const newNode = {
        id: newNodeId,
        type: "automationNode",
        position: {
          x: parentPosition.x,
          y: parentPosition.y + 200,
        },
        // data: {
        //   ...defaultData,
        //   onAdd: () => handleAddNode(type, newNode),
        //   onDelete: () => handleDeleteNode(newNodeId),
        // },
        data: {
          ...defaultData,
          onAdd: () => handleAddNode(type, newNode),
          onDelete: () => handleDeleteNode(newNodeId),
          onUpdate: (updatedData) =>
            setNodes((nds) =>
              nds.map((n) =>
                n.id === newNodeId
                  ? {
                      ...n,
                      data: {
                        ...n.data,
                        ...updatedData,
                      },
                    }
                  : n
              )
            ),
        },
      };

      setNodes((nds) => [...nds, newNode]);
      setEdges((eds) => [
        ...eds,
        {
          id: `edge_${parentNode.id}-${newNodeId}`,
          source: parentNode.id,
          target: newNodeId,
          type: "smoothstep",
        },
      ]);
    },
    [nodes, setNodes, setEdges]
  );

  const handleDeleteNode = useCallback(
    (nodeId) => {
      setNodes((nds) => nds.filter((node) => node.id !== nodeId));
      setEdges((eds) =>
        eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId)
      );
    },
    [setNodes, setEdges]
  );

  const handleSaveFlow = () => {
    const sequence = buildSequence(nodes, edges);
    console.log("Saved Flow:", sequence);
    const params = {
      flowData: sequence,
      user_id: user_id,
      name: "My Email Automation Flow",
    };
    // dispatch(addEmailFLowApi(token, params));
    // Send to backend via fetch/axios here
    // axios.post('/api/save-flow', sequence)
  };

  const buildSequence = (nodes, edges) => {
    const nodeMap = new Map(nodes.map((n) => [n.id, n]));
    const edgeMap = new Map();
    edges.forEach((e) => {
      if (!edgeMap.has(e.source)) edgeMap.set(e.source, []);
      edgeMap.get(e.source).push(e.target);
    });

    const sequence = [];
    let currentId = "1"; // assuming '1' is the start
    const visited = new Set();

    while (currentId && !visited.has(currentId)) {
      visited.add(currentId);
      const node = nodeMap.get(currentId);
      if (node) {
        sequence.push({
          id: node.id,
          type: node.data?.type || "unknown",
          data: node.data,
        });
      }
      const next = edgeMap.get(currentId)?.[0];
      currentId = next;
    }

    return sequence;
  };

  // Update the start node with handlers
  // nodes[0].data = {
  //   ...nodes[0].data,
  //   onAdd: () => handleAddNode("email", nodes[0]),
  //   onDelete: () => {},
  // };
  nodes[0].data = {
    ...nodes[0].data,
    onAdd: () => handleAddNode("email", nodes[0]),
    onDelete: () => {},
    onUpdate: (updatedData) =>
      setNodes((nds) =>
        nds.map((n) =>
          n.id === "1"
            ? {
                ...n,
                data: {
                  ...n.data,
                  ...updatedData,
                },
              }
            : n
        )
      ),
  };
  useEffect(() => {
    const query = `user_id=${user_id}`;
    dispatch(getUserEmailFlows(token, query));
  }, [token, user_id, dispatch]);
  return (
    <div className=" h-[77vh] bg-gray-50 p-5">
      <div className=" top-6 left-6 z-10">
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
          Email Automation Flow Builder
        </h1>
        <p className="text-gray-600 mt-1 mb-4">
          Add steps and build your sequence visually
        </p>
        <div className="space-x-2">
          <button
            onClick={() => handleAddNode("condition")}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            🔀 Add New Step
          </button>
          <button
            onClick={handleSaveFlow}
            className="px-4 py-2 bg-gray-800 text-white rounded"
          >
            💾 Save Flow
          </button>
        </div>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        className="bg-gray-50"
        defaultViewport={{ zoom: 1.5 }}
      >
        <Background
          variant="dots"
          gap={12}
          size={1}
          color="#94a3b8"
          style={{ opacity: 0.3 }}
          offset={1}
        />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Content;
