// XML content provided by the user
let xmlContent = `
<html><head><style type="text/css">@charset "UTF-8";[ng\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide:not(.ng-hide-animate){display:none !important;}ng\:form{display:block;}.ng-animate-shim{visibility:hidden;}.ng-anchor{position:absolute;}</style>
</head>
    <body>
        <!-- uiView:  --><div ui-view="" class="ng-scope"><app-header class="ng-scope ng-isolate-scope"><nav class="navbar navbar-light">
        <div class="container">

            <a class="navbar-brand ng-binding" ui-sref="app.home" ng-bind="::$ctrl.appName | lowercase" href="#/">conduit</a>

            <!-- Show this for logged out users -->
            <ul show-authed="false" class="nav navbar-nav pull-xs-right" style="display: inherit;">

                <li class="nav-item">
                    <a class="nav-link" ui-sref-active="active" ui-sref="app.home" href="#/">
                        Home
                    </a>
                </li>

                <li class="nav-item">
                    <a class="nav-link active" ui-sref-active="active" ui-sref="app.login" href="#/login">
                        Sign in
                    </a>
                </li>

                <li class="nav-item">
                    <a class="nav-link" ui-sref-active="active" ui-sref="app.register" href="#/register">
                        Sign up
                    </a>

                </li></ul>

            <!-- Show this for logged in users -->

        </div>
    </nav>
    </app-header>
    </div>
        <script src="main.js"></script>

        <a href="https://github.com/gothinkster/angularjs-realworld-example-app" target="_blank" style="position:fixed;bottom:0;width:100%;background:linear-gradient(#485563, #29323c);text-align: center;padding:15px;box-shadow:0 5px 5px 5px rgba(0,0,0,0.4);z-index:999;color:#fff;font-size:1.5rem;display:block"><i class="ion-social-github"></i>&nbsp;&nbsp;Fork on GitHub</a>
    </body></html>
`;

// Function to extract middle rows from XML body content
function extractMiddleRows(xmlContent, numRows) {
        // Create a temporary div element to parse the XML content
        let tempDiv = document.createElement('div');
        tempDiv.innerHTML = xmlContent;

        // Extract the body element
        let bodyElement = tempDiv.querySelector('body');

        // Extract rows from the body
        let bodyRows = bodyElement.children;

        // Calculate the start and end index for the middle rows
        let middleStartIndex = Math.floor((bodyRows.length - numRows) / 2);
        let middleEndIndex = middleStartIndex + numRows;

        // Extract the middle rows
        let middleRows = [];
        for (let i = middleStartIndex; i < middleEndIndex; i++) {
                if (bodyRows[i]) {
                        middleRows.push(bodyRows[i].outerHTML);
                }
        }

        return middleRows.join('');
}

// Example usage: Specify the number of rows you want to extract
let numRows = 50; // Change this to the desired number of rows
let extractedMiddleRows = extractMiddleRows(xmlContent, numRows);
console.log(extractedMiddleRows);
