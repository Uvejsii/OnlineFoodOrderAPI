import styled from "styled-components";

const TotalPrice = styled.h4`
  color: #ff6536;
  font-weight: 600;
`;

const PaymentSummary = ({ subTotal, orderTotal }) => {
  return (
    <div className="shadow p-3 rounded-4 border">
      <h4 className="text-secondary">
        Sub Total: € {subTotal !== undefined ? subTotal.toFixed(2) : "0.00"}
      </h4>
      <h6>Transport: € {subTotal > 0 ? "1.00" : "0.00"} </h6>
      <TotalPrice>Total: € {orderTotal.toFixed(2)}</TotalPrice>
      <hr />
      <h6 className="text-secondary">Minimum order € 5.00</h6>
    </div>
  );
};

export default PaymentSummary;
