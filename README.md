# AngelHack 2015: M3Dical

We developed an application for HP's Sprout Platform (https://sprout.hp.com) that enables the device to function as a medical 
kiosk at hospitals or emergency rooms. Users can place their insurance cards and drivers license down on the pad and have their
information scanned into the hospital system[1]. Nurse's can enter in a description of the injury, and using HP's concept extractor
API combined with the Snowmed API, we can deliver a potential diagnosis[2]. 

We implemented a system that creates a custom finger splint for your hand. The user places their hand on the pad, and the
HP Sprout scans their hand. The user uses the on-screen controls to manipulate an outlign of a brace over their finger, and 
the Javascript manipulations are sent to a python function that modifies an STL file of a 3d brace. We display the brace with 
Autodesk's API, then send the custom file to the 3D printer.

Our project won Autodesk's first place prize, HP's second place price, and we were a AngelHack finalist.

Code is mostly messy since a lot was written at 4:00am, but we plan on coming back through, tidying it up and fully implementing
each of the features described above.

[1]We will work to become 100% HIPPA compliant. We worked with HP's OCR text from image extractor, however the camera had difficulties
reading the small print and holofoil security features. For demo purposes, we used a pre-scanned and configured image, but we
will eventually get the HP API fully functional to actually scan the licenses and properly format the values.

[2]HP's concept extractor API is correctly configured; however due to a lack of documentation we were unable to correctly connect
the Snowmed API in the short time we had, and for the demo we hard-coded in certain values to correspond the the HP API. 
Next verison will correctly have the Snowmed API configured and return real potential medical diagnostics.

The 3D preview is of an existing brace rather than the newly created one; it would take a while to show the new brace rather than
a placeholder. We do create a new 3D print for the finger, we just display the old one however.

In future versions we will: 1. clean up the code. 2. become HIPPA compliant. 3. Increase accuracy of document reader and formatting, 
enable the data to be automaticically entered into the hospital system. 4. Fully connect the concept extractor to medical API's 
5. Add other medical features beside creating braces; we could use the comuter's webcam to look for jaundiced eyes, etc. 6. Automatically
send the new 3D finger brace to the hospital's 3D printer.
