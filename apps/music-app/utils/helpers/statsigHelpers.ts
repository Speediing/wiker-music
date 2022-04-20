import statsig from "statsig-node";
export const getStatSigUserId = (cookieId: string | null): string => {
  let userID = cookieId;

  if (!userID) {
    userID = crypto.randomUUID();
  }
  return userID;
};

export const getStatSigPodcastButtonType = async (userID: string) => {
  await statsig.initialize(process.env.STATSIG_SERVER_API_KEY as string, {
    initTimeoutMs: 1000,
  });

  const experiment = await statsig.getExperiment({ userID }, "podcast_button");
  return experiment.get("type", "badge");
};
