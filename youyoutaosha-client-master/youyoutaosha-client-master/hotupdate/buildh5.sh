#!/bin/bash
cp -r ../../weilaiClient/build/templateShowAll/* ../../weilaiClient/build/web-mobile/

function compress() {
    for file in $1
    do
    	echo $file
	    filepath=`dirname $file`
	    subpath=${filepath:2}
	    filename=`basename $file`

	    # echo $filepath
	    # echo $subpath
	    # echo $filename
        if test -f $file
        then
            echo $filename
            $cur/pngquant/pngquant --quality 60-80 --force $file --output $file
        fi
    done
}
# compress "./res/raw-assets/resources/baseScene/*.png"

echo `pwd`


