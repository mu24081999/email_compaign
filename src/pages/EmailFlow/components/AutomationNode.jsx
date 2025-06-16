import React, { useState, useEffect } from "react";
import { Handle, Position } from "reactflow";
import DatePicker from "react-datepicker";
import {
  PlusIcon,
  TrashIcon,
  ClockIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { getUserTemplateList } from "../../../redux/services/template";
import { getUserSequenceList } from "../../../redux/services/sequence";
import { getEmailAccountsApi } from "../../../redux/services/email";
import { MdContentCopy } from "react-icons/md";

function AutomationNode({ data, isConnectable }) {
  const dispatch = useDispatch();
  const { templates } = useSelector((state) => state.template);
  const { sequences } = useSelector((state) => state.sequence);
  const { emails } = useSelector((state) => state.email);
  const { user_id, token } = useSelector((state) => state.auth);

  // Local input state
  const [selectedDate, setSelectedDate] = useState(
    data.selectedDate || new Date()
  );
  const [selectedType, setSelectedType] = useState(
    data.selectedType || "sequence"
  );
  const [selectedItem, setSelectedItem] = useState(data.selectedItem || null);
  const [selectedEmail, setSelectedEmail] = useState(data.selectedEmail || "");
  const [recipientEmail, setRecipientEmail] = useState(
    data.recipientEmail || ""
  );

  useEffect(() => {
    const query = `user_id=${user_id}`;
    dispatch(getUserTemplateList(token, user_id));
    dispatch(getUserSequenceList(token, user_id));
    dispatch(getEmailAccountsApi(token, query));
  }, [token, user_id, dispatch]);

  // 🔁 Notify parent with latest data
  useEffect(() => {
    if (data.onUpdate) {
      data.onUpdate({
        selectedDate,
        selectedType,
        selectedItem,
        selectedEmail,
        recipientEmail,
      });
    }
  }, [
    selectedDate,
    selectedType,
    selectedItem,
    selectedEmail,
    recipientEmail,
    data,
  ]);

  const currentItems =
    selectedType === "template"
      ? templates?.templatesData || []
      : sequences?.sequencesData || [];

  return (
    <div className="bg-white rounded-xl shadow-lg p-5 min-w-[320px] border-2 border-blue-100">
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        className="w-3 h-2 !bg-blue-500"
      />

      <div className="space-y-5">
        {/* Email Account */}
        <div>
          <label className="flex items-center space-x-2 text-lg font-medium text-gray-700">
            <EnvelopeIcon className="w-5 h-5 text-blue-500" />
            <span>Email Account</span>
          </label>
          <select
            value={selectedEmail}
            onChange={(e) => setSelectedEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="" disabled>
              Select Email Account
            </option>
            {emails?.accountsData?.map((email) => (
              <option key={email.id} value={email.id}>
                {email.email}
              </option>
            ))}
          </select>
        </div>

        {/* Schedule Time */}
        <div className="space-y-3">
          <label className="flex items-center space-x-2 text-lg font-medium text-gray-700">
            <ClockIcon className="w-5 h-5 text-blue-500" />
            <span>Schedule Time</span>
          </label>
          <DatePicker
            selected={selectedDate}
            onChange={setSelectedDate}
            className="text-sm text-gray-600 py-3 w-full rounded-lg border border-gray-200"
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="MMM d, yyyy h:mm aa"
            placeholderText="Select Date and Time"
          />
        </div>

        {/* Type selector */}
        <div className="flex space-x-3">
          <button
            onClick={() => setSelectedType("sequence")}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
              selectedType === "sequence"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Sequence
          </button>
          <button
            onClick={() => setSelectedType("template")}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
              selectedType === "template"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Template
          </button>
        </div>

        {/* Item list */}
        <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
          {currentItems.length === 0 && (
            <p className="text-gray-500 text-sm text-center py-4">
              No {selectedType}s available.
            </p>
          )}
          {currentItems.map((item) => (
            <div
              key={item.id}
              className={`p-3 rounded-lg cursor-pointer transition-all relative ${
                selectedItem === item.id
                  ? "bg-blue-50 border-2 border-blue-500"
                  : "border-2 border-gray-100 hover:border-blue-200"
              }`}
              onClick={() => setSelectedItem(item?.id)}
            >
              <div className="flex items-start space-x-3">
                <MdContentCopy className="w-5 h-5 text-blue-500 mt-1" />
                <div>
                  <h3 className="font-medium text-gray-900">
                    {item.subject || item.title}
                  </h3>
                  <p
                    className="text-sm text-gray-600"
                    dangerouslySetInnerHTML={{
                      __html: item?.content?.slice?.(0, 50) + "...",
                    }}
                  ></p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recipient Email */}
        <div className="pt-2">
          <label className="flex items-center space-x-2 text-lg font-medium text-gray-700">
            <EnvelopeIcon className="w-5 h-5 text-blue-500" />
            <span>Recipient Email</span>
          </label>
          <input
            name="recipient"
            value={recipientEmail}
            placeholder="Enter recipient email"
            onChange={(e) => setRecipientEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-between pt-2">
          <button
            onClick={data.onAdd}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            Add Step
          </button>
          <button
            onClick={data.onDelete}
            className="flex items-center px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
          >
            <TrashIcon className="w-4 h-4 mr-2" />
            Delete Node
          </button>
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        className="w-3 h-3 !bg-blue-500"
      />
    </div>
  );
}

export default AutomationNode;
