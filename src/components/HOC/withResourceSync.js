import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { fetchResourceAndSyncAction, stopResourceSyncAction } from '../../actions'
import { withRouter } from "react-router"

export default (WrappedComponent, { resource, param, onUnsubscribeAction }) => {
  class withResourceSync extends PureComponent {
    componentDidMount () {
      const { match: { params }, fetchResourceAndSync } = this.props
      fetchResourceAndSync(params[param])
    }
  
    componentWillUnmount () {
      const { stopResourceSync, onUnsubscribe } = this.props
      stopResourceSync()
      onUnsubscribe()
    }

    componentDidUpdate ({ match: { params: prevParams } }) {
      const { match: { params }, stopResourceSync, onUnsubscribe } = this.props
      if (prevParams[param] !== params[param]) {
        onUnsubscribe()
        stopResourceSync()
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return withRouter(
    connect(
      null,
      (dispatch, state) => ({ 
        fetchResourceAndSync: (param) => dispatch(fetchResourceAndSyncAction({ resource, param })),
        stopResourceSync: () => dispatch(stopResourceSyncAction(resource)),
        onUnsubscribe: () => !!onUnsubscribeAction && dispatch(onUnsubscribeAction())
      })
    )(withResourceSync)
  )
}
