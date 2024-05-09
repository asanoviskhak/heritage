import {NextResponse} from "next/server";
import * as fs from "fs";
import {createTreeEdges} from "@/core/utils/tree-utils";
import {APP_API_DATA_FILE} from "@/core/data/constants";
import {getApiData} from "@/core/utils/api-utils";


export async function POST(request: Request) {

    const body  = await request.json();

    const limit = body.limit || -1;

    const data = getApiData();

    if (data) {

        const nodes = JSON.parse(data);

        if (limit > 0) {
            const json = createTreeEdges(nodes.slice(0, limit));
            return NextResponse.json(json);
        }

        return NextResponse.json(createTreeEdges(nodes));
    }

    return NextResponse.json({ message:  "Something went wrong!" });
}