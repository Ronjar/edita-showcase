import type { PageServerLoad } from './$types';
import type { License } from '$lib/types/license';
import fs from 'fs/promises';
import path from 'path';

// Globale Variable, um die Lizenzen einmalig zu speichern.
// Wenn "null", ist noch nicht geladen.
let cachedLicenses: License[] | null = null;

// Diese Funktion kümmert sich darum, dass die Lizenzen nur ein einziges Mal gelesen werden.
async function loadLicensesOnce(): Promise<License[]> {
    if (cachedLicenses) {
        return cachedLicenses;
    }

    const data: License[] = [];
    
    try {
    const licenseDir = path.resolve('./static/licenses');
    let files: string[] = [];

        files = await fs.readdir(licenseDir);
        for (const file of files) {
            if (file.endsWith('.txt')) {
                const rawFilename = file.replace('.txt', '');
                const fileContent = await fs.readFile(path.join(licenseDir, file), 'utf-8');
    
                const parts = rawFilename.split('_');
                const title = parts[0];
                const licenseType = parts[1];
    
                data.push({
                    title,
                    licenseType,
                    licenseText: fileContent,
                    fileName: file
                });
            }
        }
    } catch (err) {
        console.error('Could not read licenses directory:', err);
        return data;
    }

    // Speichern in der globalen Variable, damit beim nächsten Aufruf nicht erneut gelesen werden muss
    cachedLicenses = data;
    return cachedLicenses;
}

export const load: PageServerLoad = async () => {
    // Lese bzw. hole die schon zwischengespeicherten Lizenzdaten
    const licenses = await loadLicensesOnce();

    return {
        licenses
    };
};
