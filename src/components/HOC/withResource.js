import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { fetchResourceAction } from '../../actions'
import { withRouter } from "react-router"

export default (WrappedComponent, { resource, param, onUpdateAction }) => {
  class withResource extends PureComponent {
    componentDidMount () {
      const { match: { params }, fetchResource, onUpdate } = this.props
      onUpdate()
      fetchResource(params[param])
    }

    componentDidUpdate ({ match: { params: prevParams } }) {
      const { match: { params }, fetchResource, onUpdate } = this.props
      if (prevParams[param] !== params[param]) {
        onUpdate()
        fetchResource(params[param])
      }
    }

    componentWillUnmount () {
      this.props.onUpdate()
    }
    
    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return withRouter(
    connect(
      null,
      (dispatch, state) => ({ 
        fetchResource: (param) => dispatch(fetchResourceAction({ resource, param })),
        onUpdate: () => !!onUpdateAction && dispatch(onUpdateAction())
      })
    )(withResource)
  )
}
