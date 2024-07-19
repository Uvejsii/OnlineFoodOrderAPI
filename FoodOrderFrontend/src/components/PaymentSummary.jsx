const PaymentSummary = ({ subTotal, orderTotal }) => {
  return (
    <div className="shadow p-3 rounded-4">
      <h4 className="text-primary">
        Sub Total: € {subTotal !== undefined ? subTotal.toFixed(2) : "0.00"}
      </h4>
      <h6>Transport: € {subTotal > 0 ? "1.00" : "0.00"} </h6>
      <h4>Total: € {orderTotal.toFixed(2)}</h4>
      <hr />
      <h6>Minimum order € 5.00</h6>
    </div>
  );
};

export default PaymentSummary;
