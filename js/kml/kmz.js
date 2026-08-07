/******************************************************************************
 * js/kml/kmz.js
 *
 * KMZ Manager
 *
 * Responsibilities:
 *  - Extract KMZ files
 *  - Read embedded resources
 *  - Create KMZ archives
 *
 * Dependency:
 *  - fflate.min.js (loaded globally)
 ******************************************************************************/

export const KMZ = {

    resources: {},

    //----------------------------------------------------------
    // Extract KMZ
    //----------------------------------------------------------
    async extract(file) {

        this.resources = {};

        const buffer = new Uint8Array(
            await file.arrayBuffer()
        );

        const zip = fflate.unzipSync(buffer);

        let kmlText = null;

        for (const filename in zip) {

            const data = zip[filename];

            this.resources[filename] = data;

            if (filename.toLowerCase().endsWith(".kml")) {

                kmlText = new TextDecoder().decode(data);

            }

        }

        if (!kmlText) {

            throw new Error("KMZ does not contain a KML file.");

        }

        return kmlText;

    },

    //----------------------------------------------------------
    // Get embedded resource
    //----------------------------------------------------------
    getResource(name) {

        return this.resources[name] || null;

    },

    //----------------------------------------------------------
    // Create KMZ
    //----------------------------------------------------------
    create(kmlText, filename = "doc.kml") {

        const archive = {};

        archive[filename] =
            new TextEncoder().encode(kmlText);

        for (const name in this.resources) {

            if (name.toLowerCase().endsWith(".kml"))
                continue;

            archive[name] = this.resources[name];

        }

        const zip = fflate.zipSync(archive, {
            level: 6
        });

        return new Blob(
            [zip],
            {
                type: "application/vnd.google-earth.kmz"
            }
        );

    },

    //----------------------------------------------------------
    // Resource URL
    //----------------------------------------------------------
    createObjectURL(name) {

        const data = this.getResource(name);

        if (!data)
            return null;

        let type = "application/octet-stream";

        const ext = name.split(".").pop().toLowerCase();

        switch (ext) {

            case "png":
                type = "image/png";
                break;

            case "jpg":
            case "jpeg":
                type = "image/jpeg";
                break;

            case "gif":
                type = "image/gif";
                break;

        }

        return URL.createObjectURL(
            new Blob([data], {
                type
            })
        );

    },

    //----------------------------------------------------------
    // Clear
    //----------------------------------------------------------
    clear() {

        this.resources = {};

    }

};