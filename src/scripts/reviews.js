import Flickity from 'vue-flickity';
 
new Vue({
    el: '#reviews',
    components: {
        Flickity
    },
  
    data() {
        return {
            flickityOptions: {
                groupCells: true,
                pageDots: false,
                prevNextButtons: false
            }
        }
    },
  
    methods: {
        next() {
            this.$refs.flickity.next();
        },
    
        previous() {
            this.$refs.flickity.previous();
        }
    }
});