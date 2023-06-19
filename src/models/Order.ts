import mongoose from "mongoose";

interface IOrderProduct {
    id: string;
    price: number;
    quantity: number;
    title: string;
}

interface IOrder extends Document {
    userId: mongoose.Schema.Types.ObjectId;
    products: IOrderProduct[];
    total: number;
    status: string;
}
const orderSchema = new mongoose.Schema<IOrder>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    products: [
        {
            id: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true },
            title: { type: String, required: true },
        },
    ],
    total: { type: Number, required: true },
    status: { type: String, required: true },
});

const Order = mongoose.model<IOrder>("Order", orderSchema);

export default Order;
