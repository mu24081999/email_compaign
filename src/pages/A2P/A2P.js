import React from "react";
import { useForm } from "react-hook-form";
import InputField from "../../components/FormFields/InputField/InputField";
import ReactSelectField from "../../components/FormFields/ReactSelectField/ReactSelectField";
import Heading from "../../components/Heading";
import Button from "../../components/Button";

const A2P = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const a2pverification = () => {};
  return (
    <div>
      <div className="w-1/2 m-auto">
        <div>
          <Heading
            className="text-center font-extrabold text-2xl pt-3 pb-10"
            text={"US A2P 10DLC Registration"}
          />
        </div>
        <form onSubmit={handleSubmit(a2pverification)}>
          <div class="modal-body row">
            <div className="py-2">
              <InputField
                control={control}
                errors={errors}
                name="legal_business_name"
                mb="true"
                label="Legal Business Name"
                placeholder="Legal Business Name"
                rules={{
                  required: {
                    value: true,
                    message: "Field required!",
                  },
                }}
              />
              <p className="mb-5">
                If you're registering a US entity, please enter the exact legal
                business name as registered with the EIN, which can be found on
                the CP 575 EIN Confirmation Letter.
              </p>
            </div>

            <div className="py-2">
              <ReactSelectField
                name="business_type"
                placeholder="Business Type"
                label="Business Type"
                control={control}
                errors={errors}
                mb={false}
                options={[
                  {
                    label: "Partnership",
                    value: "partnership",
                  },
                  {
                    label: "Corporation",
                    value: "corporation",
                  },
                  {
                    label: "Co-operative",
                    value: "cooperative",
                  },
                  {
                    label: "Limited Liability Corporation",
                    value: "limited_liability_corporation",
                  },
                  {
                    label: "Non-profit Corporation",
                    value: "non-profit-corporation",
                  },
                ]}
                rules={{
                  required: {
                    value: true,
                    message: "Field required!",
                  },
                }}
              />
            </div>
            <div className="py-2">
              <ReactSelectField
                name="business_registration_id_type"
                placeholder="Business Registration ID Type"
                label="Business Registration ID Type"
                control={control}
                errors={errors}
                //   mb={false}
                options={[
                  {
                    label: "USA: Employer Identification Number",
                    value: "usa_ein",
                  },
                  {
                    label: "CANADA: Canada Business Number",
                    value: "canada_cbn",
                  },
                  {
                    label: "Great Britian: Business Number",
                    value: "britian-bn",
                  },
                  {
                    label: "Australia: Company Number from ASIC (ACN)",
                    value: "australia-cn",
                  },
                  {
                    label: "India: Corporate Identity Number",
                    value: "india-cin",
                  },
                  {
                    label: "VAT Number",
                    value: "vat-number",
                  },
                  {
                    label: "Israel: Registration Number",
                    value: "israel",
                  },
                  {
                    label: "Other",
                    value: "other",
                  },
                ]}
                rules={{
                  required: {
                    value: true,
                    message: "Field required!",
                  },
                }}
              />
            </div>

            <div className="py-2">
              <InputField
                control={control}
                errors={errors}
                name="business_reg_no"
                mb="true"
                label="Business Registration Number"
                placeholder="Business Registration Number"
                rules={{
                  required: {
                    value: true,
                    message: "Field required!",
                  },
                }}
              />
              <p className="mb-5">
                Enter the EIN / Tax ID as it appears in the EIN listing
              </p>
            </div>
            <div className="py-2">
              <ReactSelectField
                name="business_industry"
                placeholder="Business Industry"
                label="Business Industry"
                control={control}
                errors={errors}
                //   mb={false}
                options={[
                  {
                    label: "Advertising and Marketing",
                    value: "advertising_marketing",
                  },
                  {
                    label: "Automotive",
                    value: "automotive",
                  },
                  {
                    label: "Consumer Services",
                    value: "consumer_services",
                  },
                  {
                    label: "Education",
                    value: "education",
                  },
                  {
                    label: "Financial Services",
                    value: "financial_services",
                  },
                  {
                    label: "Gaming",
                    value: "gaming",
                  },
                  {
                    label: "Government and Public Sector",
                    value: "government_public_sector",
                  },
                  {
                    label: "Healthcare",
                    value: "healthcare",
                  },
                  {
                    label: "Hospitality and Travel",
                    value: "hospitality_travel",
                  },
                  {
                    label: "Insurance",
                    value: "insurance",
                  },
                  {
                    label: "Media and Entertainment",
                    value: "media_entertainment",
                  },
                  {
                    label: "Real Estate",
                    value: "real_estate",
                  },
                  {
                    label: "Retail",
                    value: "retail",
                  },
                  {
                    label: "Technology",
                    value: "technology",
                  },
                  {
                    label: "Telecommunications",
                    value: "telecommunications",
                  },
                  {
                    label: "Transportation and Logistics",
                    value: "transportation_logistics",
                  },
                  {
                    label: "Utilities",
                    value: "utilities",
                  },
                  {
                    label: "Other",
                    value: "other",
                  },
                ]}
                rules={{
                  required: {
                    value: true,
                    message: "Field required!",
                  },
                }}
              />
            </div>

            <div className="py-2">
              <InputField
                control={control}
                errors={errors}
                name="website_url"
                mb="true"
                label="Website URL"
                placeholder="Website URL"
                rules={{
                  required: {
                    value: true,
                    message: "Field required!",
                  },
                }}
              />
              <p className="mb-5">
                The provided website should be reflective of the registered
                brand and accessible.
              </p>
            </div>
            <div className="py-2">
              <ReactSelectField
                name="business_region"
                placeholder="Business Rigion"
                label="Business Rigion"
                control={control}
                errors={errors}
                //   mb={true}
                options={[
                  {
                    label: "Africe",
                    value: "africa",
                  },
                  {
                    label: "Asia",
                    value: "asia",
                  },
                  {
                    label: "Europe",
                    value: "europe",
                  },
                  {
                    label: "Canada and USA",
                    value: "canada_usa",
                  },
                  {
                    label: "Latin America",
                    value: "latin_america",
                  },
                ]}
                rules={{
                  required: {
                    value: true,
                    message: "Field required!",
                  },
                }}
              />
            </div>
            <div className="py-2">
              <ReactSelectField
                name="country"
                placeholder="Select Country"
                label="Country"
                control={control}
                errors={errors}
                //   mb={true}
                // options={countryList().getData() || []}
                options={[
                  {
                    label: "United States",
                    value: "US",
                  },
                ]}
                rules={{
                  required: {
                    value: true,
                    message: "Field required!",
                  },
                }}
              />
            </div>
            <div className="grid grid-cols-2 gap-5 py-2">
              <div className="">
                <InputField
                  control={control}
                  errors={errors}
                  name="street"
                  //   mb="true"
                  label="Street Address"
                  placeholder="Street Address"
                  rules={{
                    required: {
                      value: true,
                      message: "Field required!",
                    },
                  }}
                />
              </div>
              <div className="">
                <InputField
                  control={control}
                  errors={errors}
                  name="city"
                  //   mb="true"
                  label="City"
                  placeholder="City"
                  rules={{
                    required: {
                      value: true,
                      message: "Field required!",
                    },
                  }}
                />
              </div>
              <div className="">
                <InputField
                  control={control}
                  errors={errors}
                  name="rigion"
                  //   mb="true"
                  label="Rigion/State/Province"
                  placeholder="Rigion"
                  rules={{
                    required: {
                      value: true,
                      message: "Field required!",
                    },
                  }}
                />
              </div>
              <div className="">
                <InputField
                  control={control}
                  errors={errors}
                  name="postal_code"
                  //   mb="true"
                  label="Zip/Postal Code"
                  placeholder="Postal Code"
                  rules={{
                    required: {
                      value: true,
                      message: "Field required!",
                    },
                  }}
                />
              </div>
            </div>
            <div className="py-2">
              <ReactSelectField
                name="brand_type"
                placeholder="Brand Type"
                label="Brand Type"
                control={control}
                errors={errors}
                //   mb={true}
                options={[
                  {
                    label:
                      "Low Volume Standard Brand $10 one time fee. 600 sms per day",
                    value: "standard",
                  },
                  // {
                  //   label:
                  //     "Standard $44 one type fee. 2000-20000 sms per day.",
                  //   value: "enterprice",
                  // },
                ]}
                rules={{
                  required: {
                    value: true,
                    message: "Field required!",
                  },
                }}
              />
            </div>
          </div>

          <div className="flex justify-end py-2">
            <Button type="submit" className="py-2">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default A2P;
