const ContentSafetyClient = require("@azure-rest/ai-content-safety").default,
  { isUnexpected } = require("@azure-rest/ai-content-safety");
const { AzureKeyCredential } = require("@azure/core-auth");

// get endpoint and key from environment variables
const endpoint = process.env.CONTENT_SAFETY_ENDPOINT;
const key = process.env.CONTENT_SAFETY_KEY;
const minHarmfulSeverityLevel = process.env.MIN_HARMFUL_SEVERITY_LEVEL;

const credential = new AzureKeyCredential(key);
const client = ContentSafetyClient(endpoint, credential);

async function textModeration(text) {
  const analyzeTextOption = { text: text };
  const analyzeTextParameters = { body: analyzeTextOption };

  const result = await client.path("/text:analyze").post(analyzeTextParameters);

  if (isUnexpected(result)) {
    const err = new Error(
      `${result.body.error.message} [Azure-rest/ai-content-safety]`
    );
    err.code = result.body.error.code;
    throw err;
  }

  const harmfulCategories = result.body.categoriesAnalysis.filter(
    (item) => item.severity >= minHarmfulSeverityLevel
  );

  const outcome = {
    categoriesAnalysis: result.body.categoriesAnalysis,
    harmfulCategories: harmfulCategories,
    isHarmful: harmfulCategories.length > 0,
  };

  //   for (let i = 0; i < result.body.categoriesAnalysis.length; i++) {
  //     const textCategoriesAnalysisOutput = result.body.categoriesAnalysis[i];
  //     console.log(
  //       textCategoriesAnalysisOutput.category,
  //       " severity: ",
  //       textCategoriesAnalysisOutput.severity
  //     );
  //   }

  return outcome;
}

module.exports = textModeration;
