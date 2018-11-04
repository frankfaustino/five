import React from 'react'

import Layout from '../components/layout'
import axios from 'axios'
import FiveList from '../components/five-list'
import PeopleList from '../components/people-list.1'
import ModalWrapper from '../components/modal-wrapper'

function getLambda(data, functionName) {
  axios.post(process.env.LAMBDA_ENDPOINT + functionName, {
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
      </Layout>
    )
  }
}

