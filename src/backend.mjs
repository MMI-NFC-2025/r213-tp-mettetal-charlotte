import PocketBase from 'pocketbase';

const db = new PocketBase('http://127.0.0.1:8090/');

export async function getOffres() {
    try {
        let data = await db.collection('Maison').getFullList({
            sort: '-created',
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la liste des maisons', error);
        return [];
    }
}

export async function getImageUrl(record, recordImage) {
    return db.files.getURL(record, recordImage);
}

export async function getOffre(id) {
    try {
        let data = await db.collection('Maison').getOne(id);
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la maison', error);
        return {};
    }
}

export async function getOffresBySurface(surface) {
    try {
        const data = await db.collection('maison').getFullList({
            filter: `Superficie > 80`,
            sort: '-created',
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la liste des maisons', error);
        return [];
    }
}

export async function addOffre(house) {
    try {
        await db.collection('maison').create(house);
        return {
            success: true,
            message: 'Offre ajoutée avec succès'
        };
    } catch (error) {
        console.log('Une erreur est survenue en ajoutant la maison', error);
        return {
            success: false,
            message: 'Une erreur est survenue en ajoutant la maison'
        };
    }
}

export async function filterByPrix(minPrix, maxPrix) {
    try {
        const data = await db.collection('maison').getFullList({
            filter: `prix >= ${minPrix} && prix <= ${maxPrix}`,
            sort: '-created',
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en filtrant les maisons par prix', error);
        return [];
    }
}

export async function allAgent(){
    try{
        let Agents = await db.collection('Agent').getFullList();
        return Agents;
    }catch(error){
        console.error("error allAgent", error);
        return null;
    }
}

export async function AllOffresByAgent(agentId){
    try{
        let Offres = await db.collection('Maison').getFullList({
            filter: `agentId = "${agentId}"`,
            sort: '-created',
        });
        return Offres;
    }catch(error){
        console.error("error AllOffresByAgent", error);
        return null;
    }
}

export async function getAgent(id){
    try{
        let Agent = await db.collection('Agent').getOne(id);
        return Agent;
    }catch(error){
        console.error("error getAgent", error);
        return null;
    }
}