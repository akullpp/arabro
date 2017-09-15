package de.akull.unit;

import de.akull.service.NumeralService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Stream;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(JUnit4.class)
public class NumeralServiceTest {

    @Test
    public void toRoman_Should_Return_Null_For_Value_Below_1() {

        String result = NumeralService.toRoman(0);

        assertThat(result).isNull();
    }

    @Test
    public void toRoman_Should_Return_Null_For_Value_Above_3999() {

        String result = NumeralService.toRoman(4000);

        assertThat(result).isNull();
    }

    @Test
    public void toRoman_Should_Return_Valid_Roman_Numerals() {
        List<Integer> arabicNumerals = Arrays.asList(1, 34, 134, 402, 567, 1001, 2222, 3123);
        List<String> romanNumerals = Arrays.asList("I", "XXXIV", "CXXXIV", "CDII", "DLXVII", "MI", "MMCCXXII", "MMMCXXIII");

        for (int i = 0; i < arabicNumerals.size(); i++) {
            String result = NumeralService.toRoman(arabicNumerals.get(i));

            assertThat(result).isEqualTo(romanNumerals.get(i));
        }
    }

    @Test
    public void calculatePrimes_Should_Calculate_Primality_For_Range() throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(getClass().getClassLoader().getResourceAsStream("primes.test.txt")));
        int[] expected = Stream.of(br.readLine().split(" ")).mapToInt(Integer::parseInt).toArray();

        int[] result = NumeralService.calculatePrimes(3999);

        assertThat(result).containsSequence(expected);
    }
}
