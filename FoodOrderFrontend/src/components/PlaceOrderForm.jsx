import styled from "styled-components";

const PlaceOrderBtn = styled.button`
  background-color: #ff6536;
  color: white;
  &:disabled {
    background-color: #fc9373;
  }
`;

const PlaceOrderForm = ({
  handleSubmit,
  orderFormData,
  handleChange,
  orderTotal,
}) => {
  return (
    <>
      <form
        className="d-flex flex-column gap-3 shadow p-3 rounded-4 border"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Location"
          className="form-control"
          name="location"
          required
          value={orderFormData.location}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="City"
          className="form-control"
          name="city"
          required
          value={orderFormData.city}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Phone Number"
          className="form-control"
          name="phoneNumber"
          required
          value={orderFormData.phoneNumber}
          onChange={handleChange}
        />
        <PlaceOrderBtn
          type="submit"
          className="border-0 rounded py-2 fw-semibold w-100"
          disabled={orderTotal < 5 ? true : null}
        >
          Place Order
        </PlaceOrderBtn>
      </form>
    </>
  );
};

export default PlaceOrderForm;
