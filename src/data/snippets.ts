import type { Snippet } from '../types/game';

export const CODE_SNIPPETS: Snippet[] = [
  // Java Snippets
  {
    id: 'java-main',
    language: 'java',
    title: 'Standard Entry Point',
    description: 'Java classic main method signature',
    code: 'public static void main(String[] args) {\n    System.out.println("JARVIS Online.");\n}'
  },
  {
    id: 'java-stream',
    language: 'java',
    title: 'Stream Filter and Map',
    description: 'Modern Java Stream API pipeline',
    code: 'List<String> activeUsers = users.stream()\n    .filter(u -> u.isActive() && u.getScore() > 90)\n    .map(User::getUsername)\n    .collect(Collectors.toList());'
  },
  {
    id: 'java-singleton',
    language: 'java',
    title: 'Thread-safe Singleton',
    description: 'Double-checked locking singleton in Java',
    code: 'public static Database getInstance() {\n    if (instance == null) {\n        synchronized (Database.class) {\n            if (instance == null) instance = new Database();\n        }\n    }\n    return instance;\n}'
  },
  {
    id: 'java-record',
    language: 'java',
    title: 'Immutable Record Class',
    description: 'Java 17+ Record definition with validation',
    code: 'public record CyberNode(String id, int latency, boolean secure) {\n    public CyberNode {\n        Objects.requireNonNull(id, "ID cannot be null");\n    }\n}'
  },

  // Python Snippets
  {
    id: 'py-shipping',
    language: 'python',
    title: 'Shipping Calculation',
    description: 'Dynamic pricing function in Python',
    code: 'def calculate_shipping(distance: float, weight: float) -> float:\n    base_fee = 12.50\n    rate = 0.75 if distance > 100 else 0.50\n    return round(base_fee + (distance * rate) + (weight * 1.2), 2)'
  },
  {
    id: 'py-decorator',
    language: 'python',
    title: 'Execution Timer Decorator',
    description: 'Timing wrapper using functools.wraps',
    code: 'def monitor_perf(func):\n    @functools.wraps(func)\n    def wrapper(*args, **kwargs):\n        start = time.perf_counter()\n        result = func(*args, **kwargs)\n        print(f"Elapsed: {time.perf_counter() - start:.4f}s")\n        return result\n    return wrapper'
  },
  {
    id: 'py-async',
    language: 'python',
    title: 'Async Coroutine Gather',
    description: 'Concurrent network probes with asyncio',
    code: 'async def fetch_telemetry(nodes: list[str]) -> list[dict]:\n    async with aiohttp.ClientSession() as session:\n        tasks = [session.get(f"https://{node}/metrics") for node in nodes]\n        responses = await asyncio.gather(*tasks)\n        return [await r.json() for r in responses]'
  },
  {
    id: 'py-comprehension',
    language: 'python',
    title: 'Dictionary & Set Comprehension',
    description: 'Pythonic matrix transformation',
    code: 'matrix_cache = {node["id"]: [p for p in node["ports"] if p != 80] for node in network_nodes if node.get("is_active")}'
  },

  // SQL Snippets
  {
    id: 'sql-select',
    language: 'sql',
    title: 'User Analytics Query',
    description: 'Aggregated metrics with window functions',
    code: 'SELECT u.id, u.email, COUNT(t.id) AS total_tx,\n    DENSE_RANK() OVER (ORDER BY SUM(t.amount) DESC) AS rank\nFROM users u\nJOIN transactions t ON t.user_id = u.id\nWHERE t.status = "SUCCESS"\nGROUP BY u.id, u.email\nHAVING COUNT(t.id) > 10;'
  },
  {
    id: 'sql-cte',
    language: 'sql',
    title: 'Recursive CTE Hierarchy',
    description: 'Recursive query traversing organizational tree',
    code: 'WITH RECURSIVE SubNodes AS (\n    SELECT id, parent_id, node_name, 1 AS depth\n    FROM cyber_tree WHERE parent_id IS NULL\n    UNION ALL\n    SELECT c.id, c.parent_id, c.node_name, p.depth + 1\n    FROM cyber_tree c JOIN SubNodes p ON c.parent_id = p.id\n)\nSELECT * FROM SubNodes ORDER BY depth, id;'
  },

  // TypeScript Snippets
  {
    id: 'ts-generic',
    language: 'typescript',
    title: 'Generic Result Monad',
    description: 'Robust error handling with discriminating unions',
    code: 'type Result<T, E = Error> = \n  | { ok: true; value: T }\n  | { ok: false; error: E };\n\nexport const safeAsync = async <T>(p: Promise<T>): Promise<Result<T>> => {\n  try {\n    return { ok: true, value: await p };\n  } catch (err) {\n    return { ok: false, error: err as Error };\n  }\n};'
  },
  {
    id: 'ts-utility',
    language: 'typescript',
    title: 'Deep Readonly Type',
    description: 'Conditional recursive mapped type',
    code: 'type DeepReadonly<T> = T extends Function | boolean | number | string | null | undefined\n  ? T\n  : T extends Array<infer U>\n  ? ReadonlyArray<DeepReadonly<U>>\n  : { readonly [K in keyof T]: DeepReadonly<T[K]> };'
  },

  // Rust Snippets
  {
    id: 'rust-ownership',
    language: 'rust',
    title: 'Pattern Matching & Concurrency',
    description: 'Safe threading and pattern matching in Rust',
    code: 'let handle = thread::spawn(move || {\n    match receiver.recv_timeout(Duration::from_millis(500)) {\n        Ok(packet) => process_node(&packet),\n        Err(RecvTimeoutError::Timeout) => warn!("Protocol sync timeout"),\n        Err(e) => error!("Channel failed: {}", e),\n    }\n});'
  }
];
