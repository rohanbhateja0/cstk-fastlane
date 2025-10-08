const BASE_URL = process.env.CONTENTSTACK_API_BASE_URL || "https://api.contentstack.io";
const API_KEY = process.env.CONTENTSTACK_API_KEY!;
const MANAGEMENT_TOKEN = process.env.CONTENTSTACK_MANAGEMENT_TOKEN!;

async function getContentType(uid: string) {
  console.log('Getting Content Type', uid, `${BASE_URL}/v3/content_types/${uid}`); 
  const res = await fetch(`${BASE_URL}/v3/content_types/${uid}`, {
    method: "GET",
    headers: {
      authorization: MANAGEMENT_TOKEN,
      api_key: API_KEY,
      "Content-Type": "application/json",
    },
  });

  if (res.status === 404 || res.status === 422) return null;
  if (!res.ok) {
    const error = await res.json();
    throw new Error(`Contentstack CMA getContentType error: ${JSON.stringify(error)}`);
  }

  return res.json();
}

async function createContentType(uid: string, schema: any, options: any) {
  const body = { content_type: { title: uid, uid, schema, options } };

  const res = await fetch(`${BASE_URL}/v3/content_types`, {
    method: "POST",
    headers: {
      authorization: MANAGEMENT_TOKEN,
      api_key: API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(`Contentstack CMA createContentType error: ${JSON.stringify(error)}`);
  }

  return res.json();
}

async function updateContentType(uid: string, schema: any, options: any) {
  const body = { content_type: { title: uid, uid, schema, options } };

  const res = await fetch(`${BASE_URL}/v3/content_types/${uid}`, {
    method: "PUT",
    headers: {
      authorization: MANAGEMENT_TOKEN,
      api_key: API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(`Contentstack CMA updateContentType error: ${JSON.stringify(error)}`);
  }

  return res.json();
}

async function getGlobalField(uid: string) {
  const res = await fetch(`${BASE_URL}/v3/global_fields/${uid}`, {
    method: "GET",
    headers: {
      authorization: MANAGEMENT_TOKEN,
      api_key: API_KEY,
      "Content-Type": "application/json",
    },
  });

  if (res.status === 404) return null;
  if (!res.ok) {
    const error = await res.json();
    throw new Error(`Contentstack CMA getGlobalField error: ${JSON.stringify(error)}`);
  }

  return res.json();
}

async function updateGlobalField(uid: string, schema: any, title?: string) {
  const body = { global_field: { uid, title: title || uid, schema } };

  const res = await fetch(`${BASE_URL}/v3/global_fields/${uid}`, {
    method: "PUT",
    headers: {
      authorization: MANAGEMENT_TOKEN,
      api_key: API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(`Contentstack CMA updateGlobalField error: ${JSON.stringify(error)}`);
  }

  return res.json();
}

export async function syncContentTypeOrGlobalField(
  uid: string,
  schema: any,
  options?: any,
  globalFieldFallback: boolean = true
) {
    console.log('Reaching the sync call', uid, schema, options, globalFieldFallback);
  const existingCT = await getContentType(uid);
  console.log('existingCT', existingCT);
  if (existingCT) {
    console.log(`Updating Content Type: ${uid}`);
    return updateContentType(uid, schema, options);
  }

  if (globalFieldFallback) {
    console.log('Updating Global Field');
    const existingGF = await getGlobalField(uid);
    console.log('existingGF', existingGF);
    if (existingGF) {
      console.log(`Content Type not found. Updating Global Field: ${uid}`, schema);
      return updateGlobalField(uid, schema, uid);
    }
  }

  console.log(`Content Type not found. Creating new Content Type: ${uid}`);
  console.log('Creating new Content Type');
  return createContentType(uid, schema, options);
}
