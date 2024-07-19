const PlaceOrderForm = ({
  handleSubmit,
  orderFormData,
  handleChange,
  orderTotal,
}) => {
  return (
    <>
      <form
        className="d-flex flex-column gap-3 shadow p-3 rounded-4"
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
        <button
          type="submit"
          className="btn btn-success fw-semibold w-100"
          disabled={orderTotal < 5 ? true : null}
        >
          Place Order
        </button>
      </form>
    </>
  );
};

export default PlaceOrderForm;
