import {Scalekit} from "@scalekit-sdk/node"

const scalekit = new Scalekit(
    process.env.SCALEKIT_ENVIRONMENT!,
    process.env.SCALEKIT_CLIENT_ID!,
    process.env.SCALEKIT_SECRET!
)

export default scalekit