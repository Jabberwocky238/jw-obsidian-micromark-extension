[知乎](https://zhuanlan.zhihu.com/p/658443665)
[[LLM Generate]]
[[Continuous Batching]]
[[ORCA]]
当前，大模型推理sota的优化手段，主要是continuous batching和paged attention，

continuous batching能去除padding带来的冗余计算，提高系统吞吐；

paged attention能节省kv_cache padding带来的冗余显存，降低显存压力。