import Flickity from 'vue-flickity';
import Vue from 'vue';
 
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
    },
    mounted() {
        var refs = this.$refs;

        refs.flickity.on('settle', function(pos){
            if (pos === this.slides.length - 1) {
                refs.nextBtn.style.opacity = '.2';
            } else {
                refs.nextBtn.style.opacity = '1';
            }

            if (pos === 0) {
                refs.prevBtn.style.opacity = '.2';
            } else {
                refs.prevBtn.style.opacity = '1';
            }
        })
    }
});