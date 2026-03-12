import '../styles/components.css'

export function NetworkGraph({ nodeInfo, networkInfo }) {
  const peers = Array.isArray(nodeInfo?.peers) ? nodeInfo.peers : []
  const centerLabel = `${nodeInfo?.host || '127.0.0.1'}:${nodeInfo?.port || '5000'}`

  return (
    <div className="network-graph" role="img" aria-label="Peer connectivity graph">
      <div className="network-graph-center">{centerLabel}</div>
      <div className="network-graph-peers">
        {peers.length === 0 ? (
          <div className="network-peer offline">No peers connected</div>
        ) : (
          peers.map((peer) => (
            <div key={peer} className="network-peer">
              {peer}
            </div>
          ))
        )}
      </div>
      <p className="network-graph-caption">
        Connected nodes: {networkInfo?.connected_nodes ?? (peers.length + 1)}
      </p>
    </div>
  )
}

export default NetworkGraph
