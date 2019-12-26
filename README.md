# use-custom-compare-effect

useEffect hook which takes a comparison function instead of compare using reference equality (inspired by [use-deep-compare-effect](https://github.com/kentcdodds/use-deep-compare-effect))

# Why?
You can solve the [problem](https://github.com/kentcdodds/use-deep-compare-effect#the-problem) of using objects as useEffect via deep compare effect explained in the link.
but the key here is that deep comparisons are slow and have unpredictable performance. The idea behind `useCustomCompareEffect` is you probably know
the shape of the data you're passing as effect dependency so that you can write a cheap and predictable compare function to decide whether run the effect or not.
another use case would be running effect only when certain properties changed.

Note: This works best when you're generating code (let's say client side api for your backend) cause you know the exact shape of the data so you can also
generate cheap compare functions as an alternative to deep comparisons or `JSON.stringify`, That's what we are doing at Sanjagh.

# Install
```sh
npm install use-custom-compare-effect
# or yarn
yarn add use-custom-compare-effect
```

## License

MIT

