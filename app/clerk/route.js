import { Webhook } from "svix";
import connectDB from "@/config/db";
import User from "@/modles/user";
import { headers } from "next/headers";

export async function POST(req) {
    const wh = new Webhook(process.env.SIGNING_SECRET)
    const headerpayload = await headers()
    const svixHeaders = {
        "svix-id": headerpayload.get("svix-id"),
        "svix-signature": headerpayload.get("svix-signature"),
    };
    //get the payload and verify it
    const payload = await req.json();
    const body = JSON.stringify(payload);
    const { data, type } = wh.verify(body, svixHeaders)
    const userData = {
        id: data.id,
        email: data.email_addresses[0].email_address,
        name: `${data.first_name} ${data.last_name}`,
        image: data.image_url
    };
    await connectDB();
    switch (type) {
        case 'user.update':
            await User.create(userData)
            break;
        case 'user.deleted':
            await User.findByIdAndUpdate(userData)
            break;
        default:
            break;
    }
    return NextResponse.json({ message: "Event received" });
}
