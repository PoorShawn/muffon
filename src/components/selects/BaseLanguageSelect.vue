<template>
  <BaseDropdown
    class="main-section"
    :options="locales"
    :selected="profileLanguage"
    @select="handleSelect"
  />
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import BaseDropdown from '@/components/dropdowns/BaseDropdown.vue'
import {
  update as updateGlobalStore
} from '@/helpers/actions/store/global'
import locales from '@/helpers/data/locales'

export default {
  name: 'BaseLanguageSelect',
  components: {
    BaseDropdown
  },
  computed: {
    ...mapState(
      profileStore,
      {
        profileLanguage: 'language'
      }
    ),
    locales () {
      return locales
    }
  },
  methods: {
    handleSelect (
      value
    ) {
      window
        .mainProcess
        .sendCommand(
          'set-language',
          value
        )

      updateGlobalStore(
        {
          'profile.language': value
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
