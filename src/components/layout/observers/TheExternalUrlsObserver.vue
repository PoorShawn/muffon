<template>
  <div
    id="the-external-links-observer"
  />
</template>

<script>
import {
  mapState
} from 'pinia'
import videoStore from '@/stores/video'
import newTabMixin from '@/mixins/newTabMixin'
import formatPathFromExternalLink
  from '@/helpers/formatters/pathFromExternalLink'

export default {
  name: 'TheExternalUrlsObserver',
  mixins: [
    newTabMixin
  ],
  computed: {
    ...mapState(
      videoStore,
      {
        isOpenVideoLinksInNewTab:
          'isOpenLinksInNewTab'
      }
    )
  },
  mounted () {
    window
      .mainProcess
      .addCommandHandler(
        'open-external-url',
        this.handleOpenExternalUrl
      )
  },
  methods: {
    handleOpenExternalUrl (
      _,
      {
        url
      }
    ) {
      this.openLink(
        {
          link: url
        }
      )
    },
    openLink (
      {
        link
      }
    ) {
      const path =
        formatPathFromExternalLink(
          {
            link
          }
        )

      if (path) {
        this.openInternalPage(
          {
            path
          }
        )
      } else {
        window
          .mainProcess
          .openExternalLink(
            link
          )
      }
    },
    openInternalPage (
      {
        path
      }
    ) {
      if (this.isOpenVideoLinksInNewTab) {
        this.openNewTab(
          {
            path
          }
        )
      } else {
        this.$router.push(
          `/${path}`
        )
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
