import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="135" cy="135" r="135" />
    <rect x="0" y="277" rx="10" ry="10" width="273" height="22" />
    <rect x="0" y="314" rx="10" ry="10" width="273" height="88" />
    <rect x="0" y="417" rx="10" ry="10" width="85" height="28" />
    <rect x="119" y="411" rx="20" ry="20" width="152" height="45" />
  </ContentLoader>
)

export default Skeleton;