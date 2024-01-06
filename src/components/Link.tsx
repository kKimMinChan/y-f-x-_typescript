import {FC} from 'react'
import type {LinkProps as RRLinkProps} from 'react-router-dom'
import {Link as RRLink, useMatch, useResolvedPath} from 'react-router-dom'

export type LinkProps = RRLinkProps & {}

export const Link: FC<LinkProps> = ({className: _classname, to, ...props}) => {
  const resolved = useResolvedPath(to)
  const match = useMatch({path: resolved.pathname, end: true})
  const className = [_classname, match ? 'btn-link' : ''].join(' ')
  return <RRLink {...props} to={to} className={className} />
}
