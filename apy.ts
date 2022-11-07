const _data = (
  baseUrl: string,
  headers: {
    [key: string]: string;
  }
) => {
  const timezones = async () => {
    const res = await fetch(`${baseUrl}/data/dictionary/timezone`, {
      method: "GET",
      headers,
    });
    const data = await res.json();
    return data.data;
  };
  const countries = async () => {
    const res = await fetch(`${baseUrl}/data/dictionary/country`, {
      method: "GET",
      headers,
    });
    const data = await res.json();
    return data.data;
  };
  return {
    timezones,
    countries,
  };
};
const _validate = (
  baseUrl: string,
  headers: {
    [key: string]: string;
  }
) => {
  const uk_postcode = async (postcode: string) => {
    const res = await fetch(`${baseUrl}/validate/postcodes/uk`, {
      method: "POST",
      body: JSON.stringify({
        postcode,
      }),
      headers,
    });
    const data = await res.json();
    return data.data;
  };
  return {
    uk_postcode,
  };
};
const _generate = (
  baseUrl: string,
  headers: {
    [key: string]: string;
  }
) => {
  const ical = async (payload: {
    summary: string;
    description: string;
    organizer_email: string;
    attendees_emails: string[];
    location: string;
    start_time: string;
    end_time: string;
    meeting_date: string;
    recurring: boolean;
    recurrence: {
      frequency: string;
      count: number;
    };
  }) => {
    const res = await fetch(`${baseUrl}/generate/ical/file?output=invite.ics`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers,
    });
    const data = await res.text();
    return data;
  };
  return {
    ical,
  };
};

export const apyClient = (token: string) => {
  const baseUrl = "https://api.apyhub.com";
  const headers = {
    "Content-Type": "application/json",
    "apy-token": token,
  };

  const data = _data(baseUrl, headers);
  const validate = _validate(baseUrl, headers);
  const generate = _generate(baseUrl, headers);

  return {
    data,
    validate,
    generate,
  };
};
