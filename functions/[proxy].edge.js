import Personalize from "@contentstack/personalize-edge-sdk";

export default async function handler(request, context) {
  const parsedUrl = new URL(request.url);

  if (
    parsedUrl.pathname.startsWith("/_next/") ||
    parsedUrl.pathname.startsWith("/api/") ||
    parsedUrl.pathname.match(
      /\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf)$/
    )
  ) {
    return fetch(request);
  }

  if (context.env.NEXT_PUBLIC_CONTENTSTACK_PERSONALIZE_EDGE_API_URL) {
    Personalize.setEdgeApiUrl(
      context.env.NEXT_PUBLIC_CONTENTSTACK_PERSONALIZE_EDGE_API_URL
    );
  }

  const personalizeSdk = await Personalize.init(
    context.env.NEXT_PUBLIC_CONTENTSTACK_PERSONALIZE_PROJECT_UID,
    { request }
  );

  const variantParam = personalizeSdk.getVariantParam();
  parsedUrl.searchParams.set(Personalize.VARIANT_QUERY_PARAM, variantParam);

  const modifiedRequest = new Request(parsedUrl.toString(), request);
  const response = await fetch(modifiedRequest);

  const modifiedResponse = new Response(response.body, response);
  personalizeSdk.addStateToResponse(modifiedResponse);
  modifiedResponse.headers.set("cache-control", "no-store");

  return modifiedResponse;
}
