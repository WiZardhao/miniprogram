  import { computed } from 'vue'
  import { useStore } from 'vuex'
 
  export function useBadge(){
    const store = useStore()
    const total = computed(()=>{
      return store.getters['m_cart/total']
    })
      uni.setTabBarBadge({
        index:2,
        text:total.value+" "
      }) 
  }