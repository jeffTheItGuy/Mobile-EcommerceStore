type AnalyticsEvent = string;

type AnalyticsParams = Record<string, unknown>;

export const Analytics = {
  identify(userId: string, traits?: AnalyticsParams) {
    console.log("[analytics] identify:", userId, traits);
  },

  track(event: AnalyticsEvent, params?: AnalyticsParams) {
    console.log("[analytics] track:", event, params);
  },

  screen(screenName: string, params?: AnalyticsParams) {
    console.log("[analytics] screen:", screenName, params);
  },

  error(error: unknown, context?: AnalyticsParams) {
    console.error("[analytics] error:", error, context);
  },
};
