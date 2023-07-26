export default {
  mounted(el, binding) {
    console.log(el, binding);
    let options = {
      rootMargin: "0px",
      threshold: 1.0,
    };
    let callback = (entries) => {
      console.log('пересечение');
      console.log(entries);
      if(entries[0].isIntersecting) {
        console.log('пересечен');
        binding.value(); //вызываем ф-ю, которыю передали
      }
    };

    let observer = new IntersectionObserver(callback, options);
    observer.observe(el);
  },
  name: 'intersection'
}