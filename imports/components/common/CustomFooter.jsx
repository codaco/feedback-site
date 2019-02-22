import React from 'react';
import { replaceComponent } from 'meteor/vulcan:core';

const CustomFooter = () => {
    return (
        <footer className="footer">
            <p>
                <a href="http://networkcanvas.com" target="_blank">Network Canvas homepage</a>
            </p>
        </footer>
    )
}

replaceComponent('Footer', CustomFooter);