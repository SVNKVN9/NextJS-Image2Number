import { NextRequest, NextResponse } from "next/server";
import Model from "../../utils/Modal";

export const GET = async (req: NextRequest, res: NextResponse) => {
    const model = Model.getInstance()

    return NextResponse.json({ loaded: model.isLoaded() })
}

export const POST = async (req: NextRequest, res: NextResponse) => {
    const body = await req.json()

    const model = Model.getInstance()

    const result = model.predict(body)
    return NextResponse.json({ result })
}