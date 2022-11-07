// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { apyClient } from "../../apy";

const apy = apyClient(process.env.APY_TOKEN as string);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await apy.generate.ical({
    summary: "My Event",
    description: "My Event Description",
    organizer_email: "e@edy.com",
    attendees_emails: ["e@edy.com"],
    location: "My Event Location",
    start_time: "08:00",
    end_time: "09:00",
    meeting_date: "30-11-2022",
    recurring: true,
    recurrence: {
      frequency: "daily",
      count: 1,
    },
  });
  console.log(data);

  res.status(200).json({ data });
}
