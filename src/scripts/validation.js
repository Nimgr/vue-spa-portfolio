import Vue from 'vue';
import SimpleVueValidator from "simple-vue-validator";
const Validator = SimpleVueValidator.Validator;
new Vue( {
  el: "#form",
  mixins: [SimpleVueValidator.mixin],
  validators: {
    "user.data": function(value) {
      return Validator.custom(function() {
        if (value.length < 3) {
          return "Не менее 3 символов";
        }
      });
    },
    "user.email": function(value) {
      return Validator.custom(function() {
        if (value.length < 3) {
          return "Не менее 3 символов";
        }
      });
    },
    "user.message": function(value) {
      return Validator.custom(function() {
        if (value.length < 3) {
          return "Не менее 3 символов";
        }
      });
    }
  },
  data() {
    return {
      user: {
        data: '',
        email: '',
        message: ''
      }
    }
  },
  methods: {
    submit() {
      this.$validate()
        .then(function(success) {
          if (success) {
            alert("Успешно!");
          } else {
            alert("Ошибка!");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
});
// export default (() => {

//   let voidСheck = (form) => {
//       let 
//           inputs = form.querySelectorAll('.js-form-input'),
//           emptyArray = [];
      
//       inputs.forEach(input => {
//           input.closest('.feedback-form__input-block').classList.remove('is-error');
//           if ( input.value == "") {
//               console.log('empty');
//               emptyArray.push(input)
//               input.closest('.feedback-form__input-block').classList.add('is-error');
//           }
//       });

//       if (emptyArray.length > 0) {
//       } else {
//           let xhr = new XMLHttpRequest;
//           console.log('xhr', xhr);
//           form.submit()
//       }
//   }

//   return {
//       init(formSelector) {
//           let 
//               form = document.querySelector(formSelector);

//           form.addEventListener('submit', function(e) {
//               e.preventDefault();
//               voidСheck(this)
//           })
//       }
//   }
// })();