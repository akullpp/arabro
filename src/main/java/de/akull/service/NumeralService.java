package de.akull.service;

import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.stream.Stream;

@Slf4j
@Service
public class NumeralService {

    /**
     * Arrays of Roman numerals in the subtractive notation.
     */
    private static final String[] M = {"", "M", "MM", "MMM"};
    private static final String[] C = {"", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"};
    private static final String[] X = {"", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"};
    private static final String[] I = {"", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"};

    @Getter
    private int[] primes;

    /**
     * Reads a vector of numbers with their primality feature.
     * <p>
     * Precalculation is more time efficient than calculation on the fly, though it requires more memory.
     */
    public NumeralService(
            @Autowired ResourceLoader resourceLoader,
            @Value("classpath:${primesResource}") Resource primesResource
    ) {
        try (BufferedReader br = new BufferedReader(new InputStreamReader(primesResource.getInputStream()))) {
            primes = Stream.of(br.readLine().split(" ")).mapToInt(Integer::parseInt).toArray();
        } catch (IOException ioe) {
            ioe.printStackTrace();
        }
    }

    /**
     * Converts an Arabic to a Roman numeral.
     * <p>
     * The Arabic numeral consists of 4 separate tokens at most which are translated step by step to Roman numerals.
     * <p>
     * Range: 0 < Arabic numeral < 4000
     *
     * @param i Arabic numeral.
     * @return Roman numeral.
     */
    public static String toRoman(Integer i) {
        if (i < 1 || i > 3999) {
            log.error("Invalid argument: " + i);
            return null;
        }
        return M[i / 1000] + C[i % 1000 / 100] + X[i % 100 / 10] + I[i % 10];
    }

    /**
     * Sieve of Eratosthenes.
     * <p>
     * Conceptually derived from http://introcs.cs.princeton.edu/java/14array/PrimeSieve.java.html
     * <p>
     * 0 and 1 are assumed to be not prime.
     * The zero index is included although not used in order to mitigate fragility by off-by-one errors.
     *
     * @param n Upper bound for the check must be at least 1.
     * @return Vector where index denotes natural number and the value the feature of primality.
     */
    public static int[] calculatePrimes(int n) {
        if (n <= 1) {
            throw new IllegalArgumentException("Argument must be greater than 1");
        }
        int[] primes = new int[n + 1];
        Arrays.fill(primes, 1);
        primes[0] = 0;
        primes[1] = 0;

        for (int i = 2; i < primes.length; i++) {
            if (primes[i] == 1) {
                for (int j = i + i; j < primes.length; j += i) {
                    primes[j] = 0;
                }
            }
        }
        return primes;
    }

    /**
     * Determines if an Arabic numeral has the primality features by looking at the value of the index in the numeral vector.
     * <p>
     * Range: 0 < Arabic numeral < length of vector + 1
     */
    public Boolean isPrime(int n) {
        if (n < 1 || n >= primes.length) {
            log.error("Invalid argument: " + n);
            return null;
        }
        return primes[n] == 1;
    }
}
