import React from 'react'

import Layout from '../components/layout'
import axios from 'axios'
import FiveList from '../components/five-list'
import PeopleList from '../components/people-list'
import ModalWrapper from '../components/modal-wrapper'

function getLambda(data, functionName) {
  axios.post(process.env.GATSBY_LAMBDA_ENDPOINT + functionName, {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data,
    }),
  })
}

export default class IndexPage extends React.Component {
  constructor() {
    super()

    this.state = {
      centerPersonIndex: 0,
      isModalOn: false,
    }

    this.onPersonChanged = this.onPersonChanged.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.bringModal = this.bringModal.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onPersonChanged(index) {
    this.setState({
      centerPersonIndex: index,
    })
  }

  hideModal() {
    this.setState({
      isModalOn: false,
    })
  }

  bringModal() {
    this.setState({
      isModalOn: true,
    })
  }

  onClick() {
    getLambda({}, 'CreateUser');
  }

  render() {
    return (
      <Layout>
        <PeopleList
          onPersonChanged={this.onPersonChanged}
          centerPersonIndex={this.state.centerPersonIndex}
          bringModal={this.bringModal}
        />
        <FiveList />
        <ModalWrapper
          isModalOn={this.state.isModalOn}
          hideModal={this.hideModal}
        />
        <button onClick={this.onClick}>Test REST API</button>
      </Layout>
    )
  }
}

