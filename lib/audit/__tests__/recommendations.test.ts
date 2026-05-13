import { describe, it, expect } from "vitest";
import { generateRecommendations } from "../recommendations";

describe("generateRecommendations", () => {
  it("flags duplicate AI assistants when 2 or more are used", () => {
    const recs = generateRecommendations(["chatgpt", "claude"], 40);
    const ids = recs.map((r) => r.id);
    expect(ids).toContain("duplicate-assistants");
  });

  it("does not flag duplicate assistants when only one is used", () => {
    const recs = generateRecommendations(["chatgpt", "cursor"], 40);
    const ids = recs.map((r) => r.id);
    expect(ids).not.toContain("duplicate-assistants");
  });

  it("flags high spend when totalSpend exceeds 300", () => {
    const recs = generateRecommendations(["chatgpt"], 350);
    const ids = recs.map((r) => r.id);
    expect(ids).toContain("high-spend-stack");
  });

  it("does not flag high spend when totalSpend is under 300", () => {
    const recs = generateRecommendations(["chatgpt"], 100);
    const ids = recs.map((r) => r.id);
    expect(ids).not.toContain("high-spend-stack");
  });

  it("flags too many coding tools when more than 2 are used", () => {
    const recs = generateRecommendations(["cursor", "replit", "bolt"], 100);
    const ids = recs.map((r) => r.id);
    expect(ids).toContain("too-many-coding-tools");
  });

  it("always includes the annual billing recommendation", () => {
    const recs = generateRecommendations(["chatgpt"], 20);
    const ids = recs.map((r) => r.id);
    expect(ids).toContain("annual-billing");
  });

  it("flags enterprise overkill for lovable with low spend", () => {
    const recs = generateRecommendations(["lovable"], 100);
    const ids = recs.map((r) => r.id);
    expect(ids).toContain("enterprise-overkill");
  });

  it("does not flag enterprise overkill for lovable with high spend", () => {
    const recs = generateRecommendations(["lovable"], 500);
    const ids = recs.map((r) => r.id);
    expect(ids).not.toContain("enterprise-overkill");
  });

  it("all recommendations have required fields", () => {
    const recs = generateRecommendations(["chatgpt", "claude", "cursor"], 200);
    recs.forEach((rec) => {
      expect(rec.id).toBeTruthy();
      expect(rec.title).toBeTruthy();
      expect(rec.description).toBeTruthy();
      expect(rec.recommendation).toBeTruthy();
      expect(["low", "medium", "high"]).toContain(rec.severity);
    });
  });

  it("returns alternative recommendation for known tools", () => {
    const recs = generateRecommendations(["chatgpt"], 20);
    const ids = recs.map((r) => r.id);
    expect(ids).toContain("alternative-chatgpt");
  });
});