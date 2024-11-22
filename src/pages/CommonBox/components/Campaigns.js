import React from "react";
import { useForm } from "react-hook-form";
import InputField from "../../../components/FormFields/InputField/InputField";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCampaignRepliesApi } from "../../../redux/services/unibox.";
const Campaigns = ({ setCampaignData }) => {
  const {
    watch,
    control,
    formState: { errors },
  } = useForm();
  const campaignInput = watch("search_campaign");
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const [campaignsData, setCampaignsData] = useState([]);
  const { compaigns } = useSelector((state) => state.compaign);

  useEffect(() => {
    if (compaigns?.campaignsData) {
      // Initialize filtered campaigns with full data
      setFilteredCampaigns(compaigns.campaignsData);
      setCampaignsData(compaigns.campaignsData);
    }
  }, [compaigns]);

  useEffect(() => {
    // Filter campaigns whenever the input changes
    if (campaignInput !== undefined) {
      const searchTerm = campaignInput.toLowerCase();
      const filterData = campaignsData.filter((item) =>
        item.title.toLowerCase().includes(searchTerm)
      );
      setFilteredCampaigns(filterData);
    } else {
      // Reset to original data when input is cleared
      setFilteredCampaigns(campaignsData);
    }
  }, [campaignInput, campaignsData]);
  const getEmailReplies = (campaign) => {
    setCampaignData(campaign);
    dispatch(getCampaignRepliesApi(token, campaign?.id));
  };
  return (
    <div>
      <div>
        <InputField
          name="search_campaign"
          control={control}
          svg={<FaSearch />}
          errors={errors}
          label="Search Campaign..."
        />

        <div>
          <ul className="font-semibold text-sm ps-5 py-2 space-y-2">
            {filteredCampaigns?.map((item, index) => (
              <li
                className="list-item list-disc cursor-pointer hover:text-gray-300 transition-colors duration-200"
                key={index}
                onClick={() => getEmailReplies(item)}
              >
                {item.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Campaigns;
