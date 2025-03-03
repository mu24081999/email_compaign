import React, { useEffect, useState } from "react";
import Button from "../../../components/Button";
import { useNavigate } from "react-router-dom";
import Table from "../../../components/Table";
import { useDispatch, useSelector } from "react-redux";
import { getUsersList } from "../../../redux/services/user";
import { loginUser } from "../../../redux/services/auth";
import { getAllRequests } from "../../../redux/slices/verification";
import { getAllRequestsApi } from "../../../redux/services/verification";
const Content = () => {
  const { token, user_id } = useSelector((state) => state.auth);
  const { verifications } = useSelector((state) => state.verification);
  const [verificationData, setVerificationData] = useState([]);
  const [pagination, setPagination] = useState({});
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllRequestsApi(token));
    return () => {};
  }, [token, dispatch]);
  const fetchData = (page) => {
    const query = `page=${page}`;
    dispatch(getAllRequestsApi(token, query));
  };
  const columns = [
    { label: "User Name", accessor: "name", type: "link" },
    { label: "Email", accessor: "email" },
    {
      label: "Brand Type",
      accessor: "brand_type",
      width: "200px",
      type: "link",
    },
    { label: "Legal Business Name", accessor: "legal_business_name" },
    { label: "Business Type", accessor: "business_type" },
    {
      label: "Business Registration Id Type",
      accessor: "business_registration_id_type",
    },
    { label: "Business Registation Number", accessor: "business_reg_no" },
    { label: "Business Industry", accessor: "business_industry" },
    { label: "Website Url", accessor: "website_url" },
    { label: "Region", accessor: "rigion" },
    { label: "Street", accessor: "street" },
    { label: "City", accessor: "city" },
    { label: "Postal Code", accessor: "postal_code" },
    { label: "Payment Status", accessor: "payment_status" },
    { label: "Amount Paid", accessor: "amount_paid" },
    { label: "Request Status", accessor: "status" },
  ];
  useEffect(() => {
    const filteredData = [];
    Array.isArray(verifications?.verifications) &&
      verifications?.verifications?.map((usr) => {
        return filteredData?.push({
          ...usr,
          actions: [
            {
              color: "green",
              label: "Login",
              onClick: () =>
                dispatch(
                  loginUser({ email: usr?.email, password: usr?.password })
                ),
            },
            {
              color: "green",
              label: "Subscription",
              onClick: () =>
                navigateTo(`/admin/user/update-subscription/${usr?.id}`),
            },
          ],
        });
      });
    setVerificationData(filteredData);
    setPagination(verifications?.pagination);

    return () => {};
  }, [verifications, dispatch, navigateTo, user_id]);
  return (
    <div>
      <div>
        <div className="py-3">
          <Button onClick={() => navigateTo("/admin/add-user")} className="">
            Add User
          </Button>
        </div>
        <div>
          <Table
            columns={columns}
            data={verificationData}
            totalItems={pagination?.totalItems}
            itemsPerPage={10}
            onPageChange={(page) => fetchData(page)}
            actions={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Content;
