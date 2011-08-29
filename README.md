# jQuery Ears Navigations Plugin

jQuery Ears Navigations is a quick and dirty plugin which can transform your Previous/Next boring links on two fancy "ears" fixed positioned on both left and right sides of your browser window.

## Supported Browsers

- Firefox 3.5+
- Safari 4 and 5+
- Google Chrome 4+
- IE 8+ (IE 7 works fine --if you don't mind to have no pointers at all--)

## Demo and Documentation

- TODO (sorry)

BUT... here we go with a quickstart tip and a quick variables' overview :)

	$(document).ready(function () {
		$('#navigation').earsnav(); // that should do the (basic) trick
	});

However, there are some things to have in mind to get the previous tip working: your prev/next links should have id attributes named "prev" and "next" respectively, otherwise you should pass the proper element id to the plugin to make it work. I.e.:

	$(document).ready(function () {
		$('#navigation').earsnav({ prevEl: '#my-custom-prev-link', nextEl: '#my-custom-next-link' });
	});

Of course, you can customize a bunch of things playing with the plugin settings. Here are the defaults:

- **wrapperCSS** (*array*, default: {})
- **pointerSize** (*number*, default: 14)
- **textTransform** (*string*, default: 'none')
- **opacity** (*number*, default: .8)
- **backgroundColor** (*string*, default: '#234')
- **fontColor** (*string*, default: '#eee')
- **fontFamily** (*string*, default: 'Arial, Helvetica, sans-serif')
- **fontSize** (*string*, default: '18px')
- **letterSpacing** (*string*, default: '-1px')
- **prevEl** (*string*, default: '#prev')
- **nextEl** (*string*, default: '#next')
- **minWidth** (*number*, default: 50)
- **maxWidth** (*number*, default: 250)
- **container** (*string*, default: 'body')
- **titlePrev** (*string*, default: 'Older')
- **titleNext** (*string*, default: 'Newer')
- **shadow** (*boolean*, default: true)
- **borderRadius** (*number*, default: 5)
- **slideText** (*boolean*, default: true)
- **type** (*string*, default: null)


## Authors

Originaly developed by Nicolás Fantino ([@ala_747](http://twitter.com/#!/ala_747/))