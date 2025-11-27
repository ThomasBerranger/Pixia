import React, { useState, useMemo, useEffect } from 'react';
import { CgSpinner } from 'react-icons/cg';
import { useApi } from '../../../hooks/useApi.tsx';
import { ENDPOINTS } from '../../../constants/endpoints.ts';
import { useAuth } from '../../../contexts/authContext.tsx';

interface SelectedOptions {
    [key: string]: string;
}

interface Schema {
    properties: {
        [key: string]: {
            type: string;
            items?: {
                type: string;
                enum?: string[];
                pattern?: string;
            };
            default?: never[];
        };
    };
}

const AvatarCustomizer: React.FC<{
    username: string;
    avatarUrl?: string;
}> = ({ username, avatarUrl }) => {
    const { apiCall } = useApi();
    const { login } = useAuth();

    const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({});
    const [schema, setSchema] = useState<Schema | null>(null);
    const [isAvatarLoading, setIsAvatarLoading] = useState(true);
    const [isAvatarSubmitLoading, setIsAvatarSubmitLoading] = useState(false);

    useEffect(() => {
        if (avatarUrl) {
            try {
                const url = new URL(avatarUrl);
                const initialOptions: SelectedOptions = {};

                url.searchParams.forEach((value, key) => {
                    if (
                        ![
                            'seed',
                            'accessoriesProbability',
                            'facialHairProbability',
                        ].includes(key)
                    ) {
                        initialOptions[key] = value;
                    }
                });

                setSelectedOptions(initialOptions);
            } catch (e) {
                console.error('Erreur parsing avatarUrl:', e);
            }
        }
    }, [avatarUrl]);

    useEffect(() => {
        fetch('https://api.dicebear.com/9.x/avataaars/schema.json')
            .then((r) => r.json())
            .then((data) => {
                setSchema(data);
            })
            .catch((err) => {
                console.error('Erreur lors du chargement du schema:', err);
            })
            .finally(() => {
                setIsAvatarLoading(false);
            });
    }, []);

    const currentAvatarUrl = useMemo(() => {
        const params: string[] = [`seed=${encodeURIComponent(username)}`];

        Object.entries(selectedOptions).forEach(([key, value]) => {
            if (value && value !== '' && value !== 'none') {
                params.push(`${key}=${encodeURIComponent(value)}`);
            }
        });

        if (selectedOptions.accessories) {
            params.push('accessoriesProbability=100');
        }
        if (selectedOptions.facialHair) {
            params.push('facialHairProbability=100');
        }

        return `https://api.dicebear.com/9.x/avataaars/svg?${params.join('&')}`;
    }, [selectedOptions, username]);

    const handleOptionChange = (optionKey: string, value: string) => {
        setIsAvatarLoading(true);

        if (!value || value === 'none') {
            setSelectedOptions((prev) => {
                const newOptions = { ...prev };
                delete newOptions[optionKey];
                return newOptions;
            });
        } else {
            setSelectedOptions((prev) => ({
                ...prev,
                [optionKey]: value,
            }));
        }
    };

    const formatLabel = (key: string): string => {
        const labels: { [key: string]: string } = {
            accessories: '👓 Accessoires',
            accessoriesColor: '🎨 Couleur accessoires',
            clothing: '👕 Vêtements',
            clothingGraphic: '💎 Motif vêtements',
            clothesColor: '🎨 Couleur vêtements',
            eyebrows: '🤨 Sourcils',
            eyes: '👁️ Yeux',
            facialHair: '🧔 Pilosité faciale',
            facialHairColor: '🎨 Couleur pilosité',
            hairColor: '🎨 Couleur cheveux',
            hatColor: '🎨 Couleur chapeau',
            mouth: '👄 Bouche',
            skinColor: '🎨 Couleur de peau',
            style: '🎨 Style',
            top: '🎩 Coiffure',
        };
        return labels[key] || key;
    };

    const formatValue = (value: string): string => {
        const translations: { [key: string]: string } = {
            blank: 'Aucun',
            kurt: 'Kurt',
            prescription01: 'Lunettes rondes',
            prescription02: 'Lunettes carrées',
            round: 'Lunettes rondes fines',
            sunglasses: 'Lunettes de soleil',
            wayfarers: 'Wayfarers',
            blazerShirt: 'Blazer chemise',
            blazerSweater: 'Blazer pull',
            collarSweater: 'Pull col',
            graphicShirt: 'T-shirt motif',
            hoodie: 'Sweat à capuche',
            overall: 'Salopette',
            shirtCrewNeck: 'T-shirt col rond',
            shirtScoopNeck: 'T-shirt col U',
            shirtVNeck: 'T-shirt col V',
            bat: 'Chauve-souris',
            cumbia: 'Cumbia',
            deer: 'Cerf',
            diamond: 'Diamant',
            hola: 'Hola',
            pizza: 'Pizza',
            resist: 'Resist',
            selena: 'Selena',
            bear: 'Ours',
            skullOutline: 'Crâne contour',
            skull: 'Crâne',
            angry: 'En colère',
            angryNatural: 'En colère naturel',
            default: 'Normal',
            defaultNatural: 'Normal naturel',
            flatNatural: 'Plat naturel',
            raisedExcited: 'Levés excité',
            raisedExcitedNatural: 'Levés excité naturel',
            sadConcerned: 'Triste inquiet',
            sadConcernedNatural: 'Triste inquiet naturel',
            unibrowNatural: 'Monosourcil',
            upDown: 'Haut bas',
            upDownNatural: 'Haut bas naturel',
            frownNatural: 'Froncé naturel',
            close: 'Fermés',
            cry: 'En pleurs',
            dizzy: 'Étourdi',
            eyeRoll: 'Lève les yeux',
            happy: 'Heureux',
            hearts: 'Cœurs',
            side: 'De côté',
            squint: 'Plissés',
            surprised: 'Surpris',
            wink: "Clin d'œil",
            winkWacky: "Clin d'œil farfelu",
            xDizzy: 'X étourdi',
            beardMedium: 'Barbe moyenne',
            beardLight: 'Barbe légère',
            beardMagestic: 'Barbe majestueuse',
            moustacheFancy: 'Moustache fantaisie',
            moustacheMagnum: 'Moustache Magnum',
            concerned: 'Inquiet',
            disbelief: 'Incrédule',
            eating: 'En train de manger',
            grimace: 'Grimace',
            sad: 'Triste',
            screamOpen: 'Cri ouvert',
            serious: 'Sérieux',
            smile: 'Sourire',
            tongue: 'Langue',
            twinkle: 'Scintillement',
            vomit: 'Vomi',
            noHair: 'Chauve',
            eyepatch: 'Cache-œil',
            hat: 'Chapeau',
            hijab: 'Hijab',
            turban: 'Turban',
            winterHat02: 'Bonnet hiver 2',
            winterHat03: 'Bonnet hiver 3',
            winterHat04: 'Bonnet hiver 4',
            winterHat1: 'Bonnet hiver 1',
            longHairBigHair: 'Longs volumineux',
            longHairBob: 'Longs carré',
            longHairBun: 'Longs chignon',
            longHairCurly: 'Longs bouclés',
            longHairCurvy: 'Longs ondulés',
            longHairDreads: 'Longs dreadlocks',
            longHairFrida: 'Longs Frida',
            longHairFro: 'Longs afro',
            longHairFroBand: 'Longs afro bandeau',
            longHairNotTooLong: 'Mi-longs',
            longHairShavedSides: 'Longs rasés côtés',
            longHairMiaWallace: 'Longs Mia Wallace',
            longHairStraight: 'Longs raides',
            longHairStraight2: 'Longs raides 2',
            longHairStraightStrand: 'Longs raides mèche',
            shortHairDreads01: 'Courts dreadlocks 1',
            shortHairDreads02: 'Courts dreadlocks 2',
            shortHairFrizzle: 'Courts frisés',
            shortHairShaggyMullet: 'Courts mulet',
            shortHairShortCurly: 'Courts bouclés',
            shortHairShortFlat: 'Courts plats',
            shortHairShortRound: 'Courts ronds',
            shortHairShortWaved: 'Courts ondulés',
            shortHairSides: 'Courts côtés',
            shortHairTheCaesar: 'Courts César',
            shortHairTheCaesarSidePart: 'Courts César raie',
            sides: 'Côtés rasés',
        };

        return (
            translations[value] ||
            value
                .replace(/([A-Z])/g, ' $1')
                .replace(/^./, (str) => str.toUpperCase())
                .trim()
        );
    };

    const formatColorValue = (hex: string): string => {
        if (hex === 'transparent') return 'Transparent';

        const colorNames: { [key: string]: string } = {
            '25557c': 'Bleu marine',
            '262e33': 'Noir',
            '3c4f5c': 'Gris anthracite',
            '5199e4': 'Bleu roi',
            '65c9ff': 'Bleu ciel',
            '929598': 'Gris',
            a7ffc4: 'Vert menthe',
            b1e2ff: 'Bleu pastel',
            e6e6e6: 'Gris clair',
            ff488e: 'Rose fuchsia',
            ff5c5c: 'Rouge corail',
            ffafb9: 'Rose poudré',
            ffdeb5: 'Pêche',
            ffffb1: 'Jaune pâle',
            ffffff: 'Blanc',
            '2c1b18': 'Noir ébène',
            '4a312c': 'Brun foncé',
            '724133': 'Châtain',
            a55728: 'Auburn',
            b58143: 'Blond doré',
            c93305: 'Roux vif',
            d6b370: 'Blond cendré',
            e8e1e1: 'Gris argenté',
            ecdcbf: 'Blond platine',
            f59797: 'Rose',
            '614335': 'Ébène',
            ae5d29: 'Caramel foncé',
            d08b5b: 'Caramel',
            edb98a: 'Beige rosé',
            f8d25c: 'Doré',
            fd9841: 'Abricot',
            ffdbb4: 'Ivoire',
        };
        return colorNames[hex] || `#${hex}`;
    };

    const handleAvatarSubmit = async (): Promise<void> => {
        setIsAvatarSubmitLoading(true);

        try {
            const response = await apiCall(ENDPOINTS.USER_UPDATE, {
                method: 'PATCH',
                body: JSON.stringify({ avatarUrl: currentAvatarUrl }),
            });

            login(response.token);
        } catch (error) {
            console.error('Erreur:', error);
        } finally {
            setIsAvatarSubmitLoading(false);
        }
    };

    const handleRandomize = (): void => {
        if (!schema) return;

        setIsAvatarLoading(true);

        const randomOptions: SelectedOptions = {};

        Object.entries(schema.properties).forEach(([key, property]) => {
            if (property.type !== 'array') return;

            if (!property.default || property.default.length === 0) return;

            if (
                [
                    'backgroundColor',
                    'backgroundType',
                    'backgroundRotation',
                    'style',
                    'base',
                    'nose',
                ].includes(key)
            )
                return;

            const randomIndex = Math.floor(
                Math.random() * property.default.length
            );
            randomOptions[key] = property.default[randomIndex];
        });

        setSelectedOptions(randomOptions);
    };

    const displayableProperties = useMemo(() => {
        if (!schema) return [];

        const filtered = Object.entries(schema.properties).filter(
            ([key, property]) => {
                if (property.type !== 'array') return false;

                if (!property.default || property.default.length === 0)
                    return false;

                return ![
                    'backgroundColor',
                    'backgroundType',
                    'backgroundRotation',
                    'style',
                    'base',
                    'nose',
                ].includes(key);
            }
        );

        const customOrder = [
            'top',
            'hairColor',
            'hatColor',
            'eyes',
            'mouth',
            'eyebrows',
            'clothing',
            'clothesColor',
            'clothingGraphic',
            'facialHair',
            'facialHairColor',
            'skinColor',
            'accessories',
            'accessoriesColor',
        ];

        return filtered.sort((a, b) => {
            const indexA = customOrder.indexOf(a[0]);
            const indexB = customOrder.indexOf(b[0]);

            if (indexA === -1 && indexB === -1) return a[0].localeCompare(b[0]);
            if (indexA === -1) return 1;
            if (indexB === -1) return -1;

            return indexA - indexB;
        });
    }, [schema]);

    if (!schema) {
        return (
            <div className="p-1 font-righteous">
                🪲 Aîe on rencontre un problème avec les avatars.
            </div>
        );
    }

    return (
        <section className="grid grid-flow-row-dense grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
            <div className="relative col-span-2 sm:col-span-1 sm:row-span-4 p-1">
                {isAvatarLoading && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                        <CgSpinner
                            size={40}
                            className="animate-spin text-retro-bg"
                        />
                    </div>
                )}
                <img
                    onLoad={() => {
                        setIsAvatarLoading(false);
                    }}
                    src={currentAvatarUrl}
                    alt="Avatar"
                    className={`h-48 mx-auto mb-4 transition-all duration-300${isAvatarLoading ? ' blur-md' : ''}`}
                />
                <div className="flex sm:block items-center gap-x-4">
                    <button
                        className="btn-primary w-full py-1 sm:mb-4"
                        onClick={handleAvatarSubmit}
                    >
                        {isAvatarSubmitLoading ? (
                            <CgSpinner
                                size={20}
                                className="animate-spin mx-auto"
                            />
                        ) : (
                            "C'est moi"
                        )}
                    </button>
                    <button
                        className="btn-ghost w-full py-1"
                        onClick={handleRandomize}
                    >
                        🎲 Aléatoire
                    </button>
                </div>
            </div>

            {displayableProperties.map(([key, property]) => {
                const values = property.default || [];
                const isColorOption =
                    property.items?.pattern ===
                    '^(transparent|[a-fA-F0-9]{6})$';

                const hatTops = [
                    'hat',
                    'hijab',
                    'turban',
                    'winterHat02',
                    'winterHat03',
                    'winterHat04',
                    'winterHat1',
                ];
                const isHatSelected =
                    selectedOptions.top &&
                    hatTops.includes(selectedOptions.top);

                let isDisabled = false;
                if (
                    key === 'clothingGraphic' &&
                    selectedOptions.clothing !== 'graphicShirt'
                ) {
                    isDisabled = true;
                }
                if (
                    key === 'accessoriesColor' &&
                    !selectedOptions.accessories
                ) {
                    isDisabled = true;
                }
                if (key === 'facialHairColor' && !selectedOptions.facialHair) {
                    isDisabled = true;
                }
                if (key === 'hairColor') {
                    if (!selectedOptions.top || isHatSelected) {
                        isDisabled = true;
                    }
                }
                if (key === 'hatColor') {
                    if (!isHatSelected) {
                        isDisabled = true;
                    }
                }

                return (
                    <div key={key} className="col-span-1 text-xs sm:text-sm">
                        <label className="font-righteous block mb-1">
                            {formatLabel(key)}
                        </label>
                        <select
                            value={selectedOptions[key] || ''}
                            onChange={(e) =>
                                handleOptionChange(key, e.target.value)
                            }
                            disabled={isDisabled}
                            className={`input-retro text-sm p-1 sm:p-2 w-full ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <option value="none">Surprise</option>
                            {values.map((value: string) => (
                                <option key={value} value={value}>
                                    {isColorOption
                                        ? formatColorValue(value)
                                        : formatValue(value)}
                                </option>
                            ))}
                        </select>
                    </div>
                );
            })}
        </section>
    );
};

export default AvatarCustomizer;
