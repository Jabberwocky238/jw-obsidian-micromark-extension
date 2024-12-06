# 入学天津大学，没有人会告诉你的秘密

Backup for [zhihu](https://zhuanlan.zhihu.com/p/716619038)

[zhihu](/p/716619038)

<!-- truncate -->

本人已经大四了，马上就要离开校园了，但回忆往昔还是有很多意不平

尤其是严重的信息不对称，导致了我很多没能更好的发挥和得到更好的结果，特此写一篇文章送给学弟学妹们。

## 一，学习篇

```rust
pub fn deserialize() -> Result<DirInfo, Box<dyn Error>> {
    for row in data.iter() {
        let mut subroot: DirInfo = row.into();
        let mut parent = data.find_parent(subroot); 
        parent.insert(subroot);
    }
    Ok(root)
}
```
