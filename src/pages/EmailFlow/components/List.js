import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Table from "../../../components/Table";

const List = () => {
  const { emailFlows, isLoading } = useSelector((state) => state.emailFlow);
  const [tableData, setTableData] = React.useState([]);
  const columns = [{ label: "Name", accessor: "name" }];
  useEffect(() => {
    const data = [];
    Array.isArray(emailFlows?.emailFlows) &&
      emailFlows?.emailFlows?.map((flow) => {
        const params = {
          ...flow,
        };
        data.push(params);
      });

    setTableData(data);
    return () => {};
  }, [emailFlows, isLoading]);
  return (
    <div>
      <div>
        {tableData?.length > 0 ? (
          <Table
            columns={columns}
            pagination={false}
            data={tableData}
            actions={false}
          />
        ) : (
          <div className="text-center bg-white py-5">No Data Found</div>
        )}
      </div>
    </div>
  );
};

export default List;
