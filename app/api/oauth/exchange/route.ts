import { NextRequest } from "next/server";
import { requireUser } from "@/app/lib/hooks";
import { nylas, nylasConfig } from "@/app/lib/nylas";
import prisma from "@/app/lib/db";
import { redirect } from "next/navigation";

export async function GET(req: NextRequest) {

    const session = await requireUser();
    const url = new URL(req.url);
    const code = url.searchParams.get("code");

    if(!code){
        return Response.json("No authorisation code returned.", {
            status: 400,
        });
    }

    try {
        const response = await nylas.auth.exchangeCodeForToken({
            clientSecret: nylasConfig.apiKey,
            clientId: nylasConfig.clientId,
            redirectUri: nylasConfig.redirectURI,
            code: code
        });

        const {grantId, email} = response;

        await prisma.user.update({
            where: {
                id: session.user?.id,
            },
            data: {
                grantId: grantId,
                grantEmail: email,
            },
        })

    } catch (error) {
        console.log("Something bad happened", error);
    }

    redirect("/dashboard");

}