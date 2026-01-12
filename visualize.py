import json
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

with open("results.json", "r") as f:
    data = json.load(f)

df = pd.DataFrame(data)

df["avg_ms"] = df["avg_ms"].astype(float)
df["min_ms"] = df["min_ms"].astype(float)
df["max_ms"] = df["max_ms"].astype(float)

sns.set(style="whitegrid")

plt.figure(figsize=(10, 6))
sns.lineplot(
    data=df,
    x="size",
    y="avg_ms",
    hue="app",
    marker="o"
)

plt.xscale("log")  # log scale for size
plt.yscale("log")  # optional: makes differences more visible
plt.xlabel("Payload Size (Bytes)")
plt.ylabel("Average Response Time (ms)")
plt.title("Benchmark: Average Response Time vs Payload Size")
plt.legend(title="App")
plt.tight_layout()
plt.show()
