import React from 'react'
import axios from 'axios'
import { Select } from 'semantic-ui-react'
import getAlbumsData from './functions/getAlbumsData'
import { v4 as uuid } from 'uuid'

export default class VkSelect extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { isLoading: false }

    this.getAlbumsData = getAlbumsData.bind(this)
  }

  componentDidMount () {
    this.request = axios.CancelToken.source()

    this.getAlbumsData()
  }

  componentDidUpdate (prevProps, prevState) {
    const { requestSource } = this.props

    if (requestSource && requestSource !== 'vk') {
      this.setState({ albumIndex: null })
    }
  }

  componentWillUnmount () {
    this.request.cancel()
  }

  fullTitle = album => `${album.artist} - ${album.title}`

  textData () {
    const { data, albumIndex } = this.state

    const album = data && data[albumIndex]

    return album ? this.fullTitle(album) : 'On VK'
  }

  albumsData () {
    const { data } = this.state

    const albumData = (album, index) => {
      const { albumIndex } = this.state
      const { getAlbumData } = this.props

      const selected = index === albumIndex

      const handleClick = () => {
        this.setState({ albumIndex: index })

        getAlbumData(album.vk_id, album.vk_owner_id, album.vk_access_hash)
      }

      return {
        key: uuid(),
        active: selected,
        selected: selected,
        text: this.fullTitle(album),
        onClick: handleClick
      }
    }

    return data.map(albumData)
  }

  render () {
    const { data, isLoading } = this.state

    const albumsData = data ? this.albumsData() : []

    const isDisabled = !data || data.length === 0

    const textData = !isLoading ? this.textData() : ''

    return (
      <Select
        button
        fluid
        labeled
        className="icon vkSelect"
        icon="vk"
        options={albumsData}
        disabled={isDisabled}
        loading={isLoading}
        text={textData}
      />
    )
  }
}
